import { Inngest } from "inngest";
import { connectDB } from "./connect.js";
import User from "../models/user.model.js";
import { logger } from "../utils/logger.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "Binary-app" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = new User({
      clerkId: id,
      name: `${first_name || ""} ${last_name || ""}`,
      email: email_addresses[0]?.email_address,
      profileImage: image_url,
    });

    await newUser.save();
    
    logger.info({
      success: true,
      message: "New user synced from Clerk to DB",
      clerkId: newUser._id,
    });

    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });

    logger.info({
      success: true,
      message: "User synced to Stream",
      clerkId: newUser.clerkId,
    });

  }
);

const deleteUserFromDb = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
    logger.info({
      success: true,
      message: "User deleted from DB",
      clerkId: id,
    });

    await deleteStreamUser(id.toString());

    logger.info({
      success: true,
      message: "User deleted from Stream",
      clerkId: id,
    });
  }
)

export const functions = [syncUser, deleteUserFromDb];
