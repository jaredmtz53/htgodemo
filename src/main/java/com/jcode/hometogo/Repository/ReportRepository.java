package com.jcode.hometogo.Repository;
import com.jcode.hometogo.Model.Report;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReportRepository extends JpaRepository<Report, Long> {
    // Custom query methods can be defined here if needed
    // For example, to find reports by reporter or reported user
    // List<Report> findByReporter(User reporter);
    // List<Report> findByReported(User reported);

}
