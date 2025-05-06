package com.ai.SpringAIDemo;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.ai.image.ImageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class GenAIController {

    private final ChatService chatService;
    private final ImageService imageService;
    private final RecipeService recipeService;
    private final InteriorDesignService intDesignService;
    // Constructor Injection (No need of @Autowired)
    public GenAIController(ChatService chatService, ImageService imageService, RecipeService recipeService, InteriorDesignService intDesignService) {
        this.chatService = chatService;
        this.imageService = imageService;
        this.recipeService = recipeService;
        this.intDesignService = intDesignService;
    }

    @GetMapping("/ask-ai")
    public String getResponse(@RequestParam(required = false) String prompt) {
        if (prompt == null || prompt.isEmpty()) {
            return "Prompt is missing! Please provide a prompt.";
        }
        return chatService.getResponse(prompt);
    }

    @GetMapping("/ask-ai-options")
    public String getResponseOptions(@RequestParam(required = false) String prompt) {
        if (prompt == null || prompt.isEmpty()) {
            return "Prompt is missing! Please provide a prompt.";
        }
        return chatService.getResponse(prompt);
    }

    @GetMapping("/generate-image")
    public void generateImages(HttpServletResponse response, @RequestParam String prompt) throws IOException {

        ImageResponse imageResponse= imageService.generateImage(prompt);

       String imageUrl = imageResponse.getResult().getOutput().getUrl();

       response.sendRedirect(imageUrl);
    }

    @GetMapping("/generate-recipe")
    public String createRecipe(@RequestParam String ingredients,
                                        @RequestParam(defaultValue = "any") String cuisine,
                                        @RequestParam(defaultValue = "") String dietaryRestrictions){


        return recipeService.createRecipe(ingredients, cuisine, dietaryRestrictions);

    }



    }
