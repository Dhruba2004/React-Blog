import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
export class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Service :: deletePost :: error :: ", error);
      return false;
    }
  }

  async getPost() {
    try {
      await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Service :: getPost :: error :: ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries
      );
      return true;
    } catch (error) {
      console.log("Service :: getPosts :: error :: ", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
        await this.bucket.createFile(
            conf.appwriteBucketID,
            ID.unique(),
            file,

        );
        return true;
        
    } catch (error) {
        console.log("Service :: uploadFile :: error :: ", error);
        return false;
        
    }
  }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId,
            );
            return true;
            
        } catch (error) {
            console.log("Service :: deleteFile :: error :: ", error);
            return false;
            
        }
    }
}
const service = new Service();
export default service;
