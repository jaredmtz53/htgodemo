package com.jcode.hometogo.Service;

import com.jcode.hometogo.Model.Image;
import com.jcode.hometogo.Model.Property;
import com.jcode.hometogo.Repository.ImageRepository;
import com.jcode.hometogo.Repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyService {
    private final PropertyRepository propertyRepository;
    private final ImageRepository imageRepository;

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public List<Property> getPropertiesByUserId(Long userId) {
        return propertyRepository.findByHostId(userId);
    }

    public List<Image> getImagesForProperty(Long propertyId) {
        return imageRepository.findByPropertyId(propertyId);
    }
}
