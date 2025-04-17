package com.jcode.hometogo.Controller;

import com.jcode.hometogo.Model.Property;
import com.jcode.hometogo.Repository.PropertyRepository;
import com.jcode.hometogo.Service.ProperyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/properties")
public class PropertyController {
    private final ProperyService properyService;

    @GetMapping
    public List<Property> getAllProperties() {
        return properyService.getAllProperties();
    }
}
