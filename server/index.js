import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import fs from 'fs';
// import apikeys from './apikeys.json' assert { type: "json" };
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/User.js';
import Post from './models/Post.js';
import bcrypt from 'bcrypt';

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// GOOGLE DRIVE AUTHENTICATION
const apikeys = JSON.parse(process.env.CLIENT_SECRET)

const SCOPE = ['https://www.googleapis.com/auth/drive'];
async function authorize() {
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );
    await jwtClient.authorize();
    return jwtClient;
}

const folder = process.env.DRIVE_FOLDER_ID
async function uploadFile(authClient, file) {
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth: authClient });
        const fileMetadata = {
            name: file.originalname,
            parents: [folder] // Replace 'folder_id' with the ID of the folder in Google Drive where you want to upload the file
        };
        const media = {
            mimeType: file.mimetype,
            body: fs.createReadStream(file.path)
        };
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, (err, uploadedFile) => {
            if (err) {
                reject(err);
            } else {
                resolve(uploadedFile.data.id);
            }
        });
    });
}

// ROUTES WITH FILES (IMAGES)
app.post('/auth/register', upload.single('picture'), async (req, res) => {
    try {
        const authClient = await authorize();
        const picturePath = await uploadFile(authClient, req.file);
        const {
            firstName,
            lastName,
            email,
            password,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        // Handle registration logic

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/posts', verifyToken, upload.single('picture'), async (req, res) => {
    try {
        const authClient = await authorize();
        const picturePath = await uploadFile(authClient, req.file);
        console.log(picturePath);
        // Handle post creation logic
        const { userId, description } = req.body;
        const user = await User.findById(userId);
        console.log(picturePath);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
        // res.status(200).json({ picturePath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ROUTES
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// DEFAULT ROUTE
app.get('/', (req, res) => {
    res.send('OK');
});

// MONGOOSE SETUP
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, {}).then(() => {
    app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`));
}).catch((error) => {
    console.log(`${error} did not connect`);
});
