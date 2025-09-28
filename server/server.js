import express from 'express';
import cors from 'cors';
import {authRoute} from './router/auth-router.js';
import { connectDb } from './utils/db.js';
import { errorMiddleware } from './middlewares/error-middleware.js';
import { contactRoute } from './router/contact-router.js';
import { serviceRoute } from './router/service-router.js';
import { adminRoute } from './router/admin-router.js';

const app = express();

const corsOptions = {
    origin:"http://localhost:5173",
    method: ["GET, POST, PUT, DELETE, PUT, PATCH"],
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(authRoute);
app.use(contactRoute);
app.use(serviceRoute);

app.use("/admin", adminRoute)

app.use(errorMiddleware);


connectDb().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    })
})