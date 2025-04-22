package com.jcode.hometogo.Service;
import com.jcode.hometogo.Model.Report;
import com.jcode.hometogo.Model.User;
import com.jcode.hometogo.Repository.ReportRepository;
import com.jcode.hometogo.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;





@Service
@RequiredArgsConstructor
public class ReportService {


    private final ReportRepository reportRepository;
    private final UserRepository userRepository;



    public Report createReport(Long reporterId, Long reportedId, String message) {
        User reporter = userRepository.findById(reporterId).orElseThrow();
        User reported = userRepository.findById(reportedId).orElseThrow();

        return reportRepository.save(Report.builder()
                .reporter(reporter)
                .reported(reported)
                .message(message)
                .build());
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public void deleteReport(Long id) {
        reportRepository.deleteById(id);
    }
    

}
