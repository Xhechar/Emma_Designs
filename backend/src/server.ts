import dotenv from 'dotenv';
import express, { json, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { welcomeUsers } from './email_helper/welcome';
import cartRouter from './routers/cart.router';
import cartegoryRouter from './routers/cartegories.router';
import orderRouter from './routers/orders.routers';
import productRouter from './routers/products.routers';
import userRouter from './routers/users.routers';
import reviewRouter from './routers/review.routers';
import authRouter from './routers/auth.router';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/cartegory', cartegoryRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);
app.use('/reviews', reviewRouter);
app.use('/auth', authRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    error: err.message
  })
});

app.listen(3000, () => {
  console.log("Server is running on port ", process.env.PORT);
});

// const mail = express();

// mail.listen(3001, async() => {
//   const checkDatabase = async () => {
//     cron.schedule("*/5 * * * * *", async () => {
//       console.log("Checking Database");
      
//       await welcomeUsers();
//     })
//   }

//   checkDatabase();
// })