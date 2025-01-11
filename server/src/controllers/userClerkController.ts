import { Request, Response } from "express";
import { clerkClient } from "../index";

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("request recieved");
  const { userId } = req.params;
  const userData = req.body;
  /////////////////
  console.log("Updating user with ID: ", userId);
  console.log("Data to update: ", {
    publicMetadata: {
      userType: userData.publicMetadata.userType,
      settings: userData.publicMetadata.settings,
    },
  });
  ///////////////////
  try {
    const user = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        userType: userData.publicMetadata.userType,
        settings: userData.publicMetadata.settings,
      },
    });

    res.json({ message: "User updated successfully", data: user });
  } catch (error) {
    //////////
    console.error("Error updating user: ", error);
    /////////////
    res.status(500).json({ message: "Error updating user", error });
  }
};
