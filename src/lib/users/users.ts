import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getOrCreateUser(password: string, name: string, email: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: {
        userName: name
      },
      update: {
        password: hashedPassword
      },
      create: {
        password: hashedPassword,
        userName: name,
        email: email
      }
    });

    return user;
  } catch (error) {
    console.error("Error getting user by id:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userName: username
      }
    });
    return user;
  } catch (error) {
    console.error("Error getting user by username:", error);
    throw error;
  }
}

// Function to verify password during login
async function verifyPassword(username: string, password: string) {
  try {
    // Retrieve the user by username
    const user = await getUserByUsername(username);

    // If user not found or no password stored, return false
    if (!user || !user.password) {
      return false;
    }

    // Compare the provided password with the stored hashed password
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
}

async function loginUser(username: string, password: string) {
  try {
    // Verify the password
    const passwordMatch = await verifyPassword(username, password);

    if (passwordMatch) {
      // Passwords match, authentication successful
      console.log("Authentication successful");
      return true;
    } else {
      // Passwords do not match, authentication failed
      console.log("Authentication failed");
      return false;
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export { getUsers, getOrCreateUser, loginUser, getUserByUsername };
