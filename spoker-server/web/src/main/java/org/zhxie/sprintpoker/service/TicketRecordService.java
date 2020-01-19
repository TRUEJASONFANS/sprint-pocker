package org.zhxie.sprintpoker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.zhxie.sprintpoker.entity.TicketRecord;
import org.zhxie.sprintpoker.repository.TicketRecordRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TicketRecordService {
    @Autowired
    private TicketRecordRepository ticketRecordRepository;

    public Optional<TicketRecord> findById(int id) {
        return ticketRecordRepository.findById(id);
    }

    public void deleteById(int id) {
        ticketRecordRepository.deleteById(id);
    }

    public TicketRecord save(TicketRecord ticketRecord) {
        Date date = new Date();
        System.out.println(date);
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        String dateNowStr = sdf1.format(date);
        ticketRecord.setUpdateTime(dateNowStr);
        return ticketRecordRepository.save(ticketRecord);
    }

//    public Page<TicketRecord> queryByDate(LocalDate date, int pageNum, int pageLimit){
//        Pageable pageable = PageRequest.of(pageNum -1, pageLimit);
//        return ticketRecordRepository.findByDate(date, pageable);
//    }

//    public Page<TicketRecord> queryByTicketNumAndDate(String ticketNum, LocalDate date, int pageNum, int pageLimit){
//        Pageable pageable = PageRequest.of(pageNum -1, pageLimit);
//        return ticketRecordRepository.findByTicketNumIgnoreCaseAndDate(ticketNum, date, pageable);
//    }

    public List<TicketRecord> findAll(int pageOffset, int pageLimit){
        Pageable pageable = PageRequest.of(pageOffset -1, pageLimit);
        Page<TicketRecord> all = ticketRecordRepository.findAll(pageable);
        return all.getContent();
    }

}