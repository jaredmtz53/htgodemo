package com.jcode.hometogo.Controller;
import com.jcode.hometogo.Model.Report;
import com.jcode.hometogo.Service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;




@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {





    private final ReportService reportService;
    




    @PostMapping
    public Report createReport(
        @RequestParam Long reporterId,
        @RequestParam Long reportedId,
        @RequestParam String message
    ) {
        return reportService.createReport(reporterId, reportedId, message);
    }

    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
    }









    
}
