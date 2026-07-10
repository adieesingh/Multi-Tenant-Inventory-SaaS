import express from "express";
import { OrganizationSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
export const organizationRouter = express.Router();

organizationRouter.post("/", async (req, res) => {
  try {
    const organizationPayLoad = OrganizationSchema.safeParse(req.body);
    if (!organizationPayLoad.success) {
      return res.status(400).json({
        message: "Data not format",
      });
    }

    const response = await prismaClient.organizations.create({
      data: {
        name: organizationPayLoad.data.name,
        username: organizationPayLoad.data.username,
        phoneNumber: organizationPayLoad.data.phoneNumber,
        address: organizationPayLoad.data.address,
        password: organizationPayLoad.data.password,
      },
    });
    if (!response) {
      return res.status(400).json({
        message: "Organization not added",
      });
    }
    if (response) {
      const token = jwt.sign(
        { id: response.id },
        process.env.JWT_SECRET as string,
      );
      return res.status(200).cookie("token", token).json({
        message: "Organization added succesfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error:error
    });
  }
});
