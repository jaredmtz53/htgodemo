package com.jcode.hometogo.Repository;

import com.jcode.hometogo.Model.Image;
import java.util.List;

@Repository
public interface ImageRepository {
    List<Image> findByPropertyId(Long propertyId);
}
