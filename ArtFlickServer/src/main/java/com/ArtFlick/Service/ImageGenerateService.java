package com.ArtFlick.Service;

import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.stabilityai.StabilityAiImageModel;
import org.springframework.ai.stabilityai.api.StabilityAiImageOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageGenerateService {

  @Autowired
  private StabilityAiImageModel openAiImageModel;

  public ImageResponse generateImages(String prompt){
    ImageResponse response = openAiImageModel.call(
        new ImagePrompt(prompt,
        StabilityAiImageOptions.builder()
                .withStylePreset("cinematic")
                .withN(4)
                .withHeight(1024)
                .withWidth(1024)
                .withResponseFormat( "image/png").build())

    );
    return response;
  }
}
