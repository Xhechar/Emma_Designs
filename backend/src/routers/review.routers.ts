import { Router } from "express";
import { ReviewController } from "../controllers/reviews.cotrollers";
import { verifyAdmin, verifyToken } from "../middleware/verify.token";

const reviewRouter = Router();
const reviewController = new ReviewController();

reviewRouter.post('/create-review/:product_id', verifyToken, reviewController.createReview);
reviewRouter.post('/update-review/:review_id', verifyToken, reviewController.updateReview);
reviewRouter.delete('/delete-review/:review_id', verifyToken, verifyAdmin, reviewController.deleteReview);
reviewRouter.get('/get-reviews-by-user-id', verifyToken, reviewController.getReviewsByUserId);
reviewRouter.get('/get-reviews-by-product-id/:product_id', verifyToken, reviewController.getReviewsByProductId);
reviewRouter.get('/get-reviews-by-rating/:rating', verifyToken, verifyAdmin, reviewController.getReviewsByRating);
reviewRouter.get('/get-all-reviews', verifyToken, verifyAdmin, reviewController.getAllReviews);

export default reviewRouter;