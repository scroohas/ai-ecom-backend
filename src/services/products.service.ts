import { GEMINI_API_KEY } from "../common/constants";
import { AppDataSource } from "../data-source";
import { ProductFeature } from "../entity/ProductFeature";
import { ProductIssue } from "../entity/ProductIssue";
import { ProductSentiment } from "../entity/ProductSentiment";
import * as products from "../products.json";
import * as aiPrompt from "../ai-prompt.json";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

class ProductService {
  getAllProducts = () => {
    return products;
  };

  getProductById = async (id: string) => {
    const allProducts = [...products];
    const product = allProducts.find((product) => product.asin === id);
    return { ...product };
  };

  generateProductAIAnalytics = async (id: string) => {
    const product = await this.getProductById(id);

    const parts = [
      ...aiPrompt,
      {
        text: `input: ${JSON.stringify(product)}`,
      },
      { text: "output: " },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    // Stores in table
    const aiAnalysis = JSON.parse(
      result.response.text().split("```")[1].split("json")[1]
    );

    return aiAnalysis;
  };

  getProductAIAnalysic = async (id: string) => {
    const productSentimentRepository =
      await AppDataSource.getRepository(ProductSentiment);

    const productIssueRepository =
      await AppDataSource.getRepository(ProductIssue);

    const productFeatureRepository =
      await AppDataSource.getRepository(ProductFeature);

    const whereClause = {
      productId: id,
    };

    const findProduct = await productSentimentRepository
      .createQueryBuilder("productSentiment")
      .where(whereClause)
      .select([
        "productSentiment.id",
        "productSentiment.productId",
        "productSentiment.productName",
        "productSentiment.positive",
        "productSentiment.negative",
        "productSentiment.neutral",
      ])
      .getOne();

    if (findProduct) {
      // get other info
      // transform it and send to frontend
    }

    // train model
    // get product analysis
    // loop over it and add features and issues to same object
    // convert that object to appropriate response
    // send it to model get current product and its analysis from ai
    // save it in db and send to frontend
  };
}

export default ProductService;
