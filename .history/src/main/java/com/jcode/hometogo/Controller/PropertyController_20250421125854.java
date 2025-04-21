package com.jcode.hometogo.Controller;

import com.jcode.hometogo.Model.Property;
import com.jcode.hometogo.Service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/properties")
public class PropertyController {
    private final PropertyService propertyService;

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("{id}")
    public Property getPropertiesForHost(@PathVariable Long id) {
        return propertyService.g(id);
    }
}
