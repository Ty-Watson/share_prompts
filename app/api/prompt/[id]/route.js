import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET(read)
export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        {/*find({}) means find all post. populate(creator) lets us get the post for each creator */}
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found", {status: 404});

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}

// PATCH(update)
//export const PATCH = async (reque)