import { Inngest } from "inngest";
import { connectDB } from "./connect";
import User from "../models/user.model";
import { profile } from "winston";

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
  }
);

export { syncUser };
