package com.jcode.hometogo.Service;

import com.jcode.hometogo.Model.Image;
import com.jcode.hometogo.Model.Property;
import com.jcode.hometogo.Repository.ImageRepository;
import com.jcode.hometogo.Repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyService {
    private final PropertyRepository propertyRepository;
    private final ImageRepository imageRepository;

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Property not found"));

    }

    public List<Image> getImagesForProperty(Long propertyId) {
        return imageRepository.findByPropertyId(propertyId);
    }
}
