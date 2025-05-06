package com.jcode.hometogo.Repository;

import com.jcode.hometogo.Model.Image;
import java.util.List;

@
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByPropertyId(Long propertyId);
}
