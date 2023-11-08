package com.chatgpt.services;

import com.chatgpt.entity.requests.UploadPhotoRequest;
import com.chatgpt.entity.responses.UploadFileResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class VkService {
    @Autowired
    FileService fileService;


    //todo вынести этот метод на фронт
    public Boolean groupIsMember(String groupId, String userId) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.vk.com/method/groups.isMember"
                + "?group_id={groupId}&user_id={userId}&access_token={accessToken}&v={v}";

        Map<String, String> params = new HashMap<>();
        params.put("groupId", groupId);
        params.put("userId", userId);
        params.put("accessToken", "");
        params.put("v", "5.131");

        String result = restTemplate.getForObject(url, String.class, params);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(result);

        return node.get("response").asBoolean();
    }

    public UploadFileResponse uploadVkPhoto(UploadPhotoRequest uploadPhotoRequest) throws JsonProcessingException {
        var file = fileService.downloadImage(uploadPhotoRequest.getImageUrl());

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("photo", new FileSystemResource(file));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        String response = restTemplate.postForObject(uploadPhotoRequest.getUploadUrl(), requestEntity, String.class);

        return new ObjectMapper().readValue(response, UploadFileResponse.class);

    }
}
