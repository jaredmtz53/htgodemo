package com.jcode.hometogo.Controller;

import com.jcode.hometogo.Model.Host;
import com.jcode.hometogo.Model.Property;
import com.jcode.hometogo.Service.HostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/host")
@RequiredArgsConstructor
public class HostController {
    private final HostService hostService;


    @GetMapping
    public List<Host> getAllHosts() {
        return hostService.getAllHosts();
    }
    @GetMapping("/{hostId}")
    public Host getHostById(@PathVariable Long hostId) {
        return hostService.getHostById(hostId);
    }
    @GetMapping("/{hostId}/properties")
    public List<Property> getAllProperties(@PathVariable Long hostId) {
        return hostService.getAllProperties(hostId);
    }
    @PostMapping("/{hostId}/properties")
    public Property addPropertyToHost(@PathVariable Long hostId, @RequestBody Property property) {
        return hostService.addPropertyToHost(hostId, property);
    }
    @DeleteMapping("/{hostId}/properties/{propertyId}")
    public void deletePropertyFromHost(@PathVariable Long hostId, @PathVariable Long propertyId) {
        hostService.deletePropertyFromHost(hostId, propertyId);
    }


}
