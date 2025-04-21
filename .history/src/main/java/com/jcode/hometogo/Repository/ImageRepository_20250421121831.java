package com.jcode.hometogo.Repository;

import com.jcode.hometogo.Model.Image;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

@
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByPropertyId(Long propertyId);
}
