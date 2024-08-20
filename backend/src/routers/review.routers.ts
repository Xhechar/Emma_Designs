import { Router } from "express";
import { ReviewController } from "../controllers/reviews.cotrollers";
import { verifyToken } from "../middleware/verify.token";

const reviewRouter = Router();
const reviewController = new ReviewController();

reviewRouter.post('/create-review/:product_id', verifyToken, reviewController.createReview);
reviewRouter.post('/update-review/:review_id', verifyToken, reviewController.updateReview);
reviewRouter.delete('delete_review/:review_id', verifyToken, reviewController.deleteReview);
reviewRouter.get('/get-reviews-by-user-id/:user_id', verifyToken, reviewController.getReviewsByUserId);
reviewRouter.get('/get-reviews-by-product-id/:product_id', verifyToken, reviewController.getReviewsByUserId);
reviewRouter.get('/get-reviews-by-rating/:rating', verifyToken, reviewController.getReviewsByUserId);
reviewRouter.get('/get-all-reviews', verifyToken, reviewController.getAllReviews);

export default reviewRouter;