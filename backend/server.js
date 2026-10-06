require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const app = express();

app.use(cors());
app.use(express.json());

// PostgreSQL adapter
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

// Prisma Client
const prisma = new PrismaClient({
    adapter,
});

app.get("/", (req, res) => {
    res.json({
        message: "ERP Backend is running"
    });
});
// Test route
app.get("/api/test", (req, res) => {
    res.json({
        message: "Backend is connected successfully!"
    });
});

// Get all users
app.get("/api/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);

        res.status(500).json({
            message: "Failed to fetch users"
        });
    }
});

// Create user
app.post("/api/users", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password,
                role
            }
        });

        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);

        res.status(500).json({
            message: "Failed to create user",
            error: error.message
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
