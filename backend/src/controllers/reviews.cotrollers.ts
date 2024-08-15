import { Request, Response } from "express";
import { getUserIdFromToken } from "../middleware/verify.token";
import { ReviewService } from "../services/reviews";

const reviewService = new ReviewService();
export class ReviewController {
  async createReview(req: Request, res: Response) {
    try {

      let response = await reviewService.createReview(getUserIdFromToken(req), req.params.product_id, req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async updateReview(req: Request, res: Response) {
    try {

      let response = await reviewService.updateReview(req.params.review_id, req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async deleteReview(req: Request, res: Response) {
    try {

      let response = await reviewService.deleteReview(req.params.review_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getReviewsByUserId(req: Request, res: Response) {
    try {

      let response = await reviewService.getReviewsByUserId(getUserIdFromToken(req));

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getReviewsByProductId(req: Request, res: Response) {
    try {

      let response = await reviewService.getReviewsByProductId(req.params.product_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getAllReviews(req: Request, res: Response) {
    try {

      let response = await reviewService.getAllReviews();

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getReviewsByRating(req: Request, res: Response) {
    try {

      let response = await reviewService.getReviewsByRating(req.params.rating);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }
}