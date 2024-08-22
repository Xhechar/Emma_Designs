import { Helpers } from "../db_helper/db_helper";
import { Order, Review } from "../interfaces/fashion.interfaces";
import lodash from 'lodash';
import { v4 } from 'uuid';

export class ReviewService {
  now: Date = new Date();
  async createReview(user_id: string, product_id: string, review: Review) {
    let userOrderExists = (await Helpers.query(`select * from oders where user_id = '${user_id}'`)).recordset as Order[];

    if (lodash.isEmpty(userOrderExists)) {
      return {
        error: 'Purchase an item in order to create a review.'
      }
    }

    let userOrder = (await Helpers.query(`select * from oders where user_id = '${user_id}' and delivery = 'delivered' and product_id = '${product_id}'`)).recordset as Order[];

    if (lodash.isEmpty(userOrder)) {
      return {
        error: 'Product is not delivered!'
      }
    }

    let reviewExists = (await Helpers.query(`select * from reviews where user_id = '${user_id}' and product_id = '${product_id}'`)).recordset as Review[];

    if (!(lodash.isEmpty(reviewExists))) {
      return {
        error: 'You already created a review for this product'
      }
    }

    let result = (await Helpers.execute('createReview', {
      review_id: v4(),
      user_id: userOrder[0].user_id,
      product_id: userOrder[0].product_id,
      rating: review.rating,
      review: review.review
    })).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Unable to create review.'
      }
    } else {
      return {
        message: 'Review successfully created.'
      }
    }
  }

  async updateReview(user_id: string, review_id: string, review: Review) {
    let userOrderExists = (await Helpers.query(`select * from reviews where user_id = '${user_id}'`)).recordset as Order[];

    if (lodash.isEmpty(userOrderExists)) {
      return {
        error: 'Create a review first in order to update.'
      }
    }
    let reviewExists = (await Helpers.query(`select * from reviews where review_id = '${review_id}' and user_id = '${user_id}'`)).recordset as Review[];

    if (lodash.isEmpty(reviewExists)) {
      return {
        error: 'The specified review does not exist.'
      }
    }

    let updateReview = (await Helpers.execute('updateReview', {
      review_id: reviewExists[0].review_id,
      user_id: reviewExists[0].user_id,
      product_id: reviewExists[0].product_id,
      rating: review.rating,
      review: review.review,
      updatedAt: new Date().toLocaleString()
    })).rowsAffected;

    if (updateReview[0] < 1) {
      return {
        error: 'Unable to update review, try again later'
      }
    } else {
      return {
        message: 'Review updated successfully.'
      }
    }
  }

  async deleteReview(review_id: string) {
    console.log(this.now.getDate());
    let reviewExists = (await Helpers.query(`select * from reviews where review_id = '${review_id}'`)).recordset as Review[];

    if (lodash.isEmpty(reviewExists)) {
      return {
        error: 'The specified review does not exist.'
      }
    }

    let deleteReview = (await Helpers.query(`delete from reviews where review_id = '${review_id}'`)).rowsAffected;

    if (deleteReview[0] < 1) {
      return {
        error: 'Unable to delete review, try again later'
      }
    } else {
      return {
        message: 'Review successfully deleted'
      }
    }
  }

  async getReviewsByUserId(user_id: string) {
    let reviews: Review[] = [];
    let reviewExists = (await Helpers.query(`select r.review_id, r.user_id, r.product_id as review_product_id, r.rating, r.review, r.createdAt as review_createdAt, r.updatedAt, p.product_id, p.name, p.images, p.short_desc, p.long_desc, p.price, p.stock_quantity, p.cartegory, p.createdAt, p.type, p.onOffer, p.discount, p.max_quantity, p.onFlush from reviews r join products p on r.product_id = p.product_id where r.user_id = '${user_id}'`)).recordset;

    if (lodash.isEmpty(reviewExists)) {
      return {
        error: 'You currently have no reviews.'
      }
    }

    else {
      reviewExists.map(review => {
        const rev: Review = ({
          review_id: review.review_id,
          user_id: review.user_id,
          product_id: review.review_product_id,
          rating: review.rating,
          review: review.review,
          createdAt: review.review_createdAt,
          updatedAt: review.updatedAt,
          product: {
            product_id: review.product_id,
            name: review.name,
            images: review.images,
            short_desc: review.short_desc,
            long_desc: review.long_desc,
            price: review.price,
            stock_quantity: review.stock_quantity,
            cartegory: review.cartegory,
            createdAt: review.createAt,
            type: review.type,
            onOffer: review.onOffer,
            discount: review.discount,
            max_quantity: review.max_quantity,
            onFlush: review.onFlush
          }
        });
        reviews.push(rev)
      })

      return {
        message: 'Review(s) fetched successfully',
        reviews: reviews
      }
    }
  }

  async getReviewsByProductId(product_id: string) {
    let productExists = (await Helpers.query(`select * from reviews where product_id = '${product_id}'`)).recordset;

    if (lodash.isEmpty(productExists)) {
      return {
        error: 'There are no reviews for the product required'
      }
    }
    
    let totalRatingsCount: number = 0;
    let reviews: Review[] = [];
    let reviewExists = (await Helpers.query(`select r.review_id, r.user_id, r.product_id as review_product_id, r.rating, r.review, r.createdAt as review_createdAt, r.updatedAt, p.product_id, p.name, p.images, p.short_desc, p.long_desc, p.price, p.stock_quantity, p.cartegory, p.createdAt, p.type, p.onOffer, p.discount, p.max_quantity, p.onFlush from reviews r join products p on r.product_id = p.product_id where r.product_id = '${product_id}'`)).recordset;

    if (lodash.isEmpty(reviewExists)) {
      return {
        error: 'You currently have no reviews.'
      }
    }

    else {
      reviewExists.map(review => {
        totalRatingsCount += review.rating as number;
        const rev: Review = ({
          review_id: review.review_id,
          user_id: review.user_id,
          product_id: review.review_product_id,
          rating: review.rating,
          review: review.review,
          createdAt: review.review_createdAt,
          updatedAt: review.updatedAt,
          product: {
            product_id: review.product_id,
            name: review.name,
            images: review.images,
            short_desc: review.short_desc,
            long_desc: review.long_desc,
            price: review.price,
            stock_quantity: review.stock_quantity,
            cartegory: review.cartegory,
            createdAt: review.createAt,
            type: review.type,
            onOffer: review.onOffer,
            discount: review.discount,
            max_quantity: review.max_quantity,
            onFlush: review.onFlush
          }
        });
        reviews.push(rev)
      });
      
      let avgRating: number = Math.round((totalRatingsCount / reviewExists.length));
      return {
        message: 'Review(s) fetched successfully',
        reviews: reviews,
        avgRating: avgRating
      }
    }
  }

  async getAllReviews() {
    let reviews: Review[] = [];
    let reviewExists = (await Helpers.query(`select r.review_id, r.user_id, r.product_id as review_product_id, r.rating, r.review, r.createdAt as review_createdAt, r.updatedAt, p.product_id, p.name, p.images, p.short_desc, p.long_desc, p.price, p.stock_quantity, p.cartegory, p.createdAt, p.type, p.onOffer, p.discount, p.max_quantity, p.onFlush from reviews r join products p on r.product_id = p.product_id`)).recordset;

    if (lodash.isEmpty(reviewExists)) {
      return {
        error: 'No reviews currently available.'
      }
    }

    else {
      reviewExists.map(review => {
        const rev: Review = ({
          review_id: review.review_id,
          user_id: review.user_id,
          product_id: review.review_product_id,
          rating: review.rating,
          review: review.review,
          createdAt: review.review_createdAt,
          updatedAt: review.updatedAt,
          product: {
            product_id: review.product_id,
            name: review.name,
            images: review.images,
            short_desc: review.short_desc,
            long_desc: review.long_desc,
            price: review.price,
            stock_quantity: review.stock_quantity,
            cartegory: review.cartegory,
            createdAt: review.createAt,
            type: review.type,
            onOffer: review.onOffer,
            discount: review.discount,
            max_quantity: review.max_quantity,
            onFlush: review.onFlush
          }
        });
        reviews.push(rev)
      })

      return {
        message: 'Review(s) fetched successfully',
        reviews: reviews
      }
    }
  }

  async getReviewsByRating(rating: string) {
    let reviews: Review[] = [];
    let reviewExists = (await Helpers.query(`select r.review_id, r.user_id, r.product_id as review_product_id, r.rating, r.review, r.createdAt as review_createdAt, r.updatedAt, p.product_id, p.name, p.images, p.short_desc, p.long_desc, p.price, p.stock_quantity, p.cartegory, p.createdAt, p.type, p.onOffer, p.discount, p.max_quantity, p.onFlush from reviews r join products p on r.product_id = p.product_id where r.rating = '${rating}'`)).recordset;

    if (lodash.isEmpty(reviewExists)) {
      return {
        error: 'You currently have no reviews.'
      }
    }

    else {
      reviewExists.map(review => {
        const rev: Review = ({
          review_id: review.review_id,
          user_id: review.user_id,
          product_id: review.review_product_id,
          rating: review.rating,
          review: review.review,
          createdAt: review.review_createdAt,
          updatedAt: review.updatedAt,
          product: {
            product_id: review.product_id,
            name: review.name,
            images: review.images,
            short_desc: review.short_desc,
            long_desc: review.long_desc,
            price: review.price,
            stock_quantity: review.stock_quantity,
            cartegory: review.cartegory,
            createdAt: review.createAt,
            type: review.type,
            onOffer: review.onOffer,
            discount: review.discount,
            max_quantity: review.max_quantity,
            onFlush: review.onFlush
          }
        });
        reviews.push(rev)
      })

      return {
        message: 'Review(s) fetched successfully',
        reviews: reviews
      }
    }
  }
}