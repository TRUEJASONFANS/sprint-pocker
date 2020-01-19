package org.zhxie.sprintpoker;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.zhxie.sprintpoker.entity.TicketRecord;
import org.zhxie.sprintpoker.service.TicketRecordService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RepositoryTest {
    @Autowired
    private TicketRecordService ticketRecordService;


    @Test
    public void testSave(){
        TicketRecord ticketRecord = new TicketRecord();
        ticketRecord.setFeature("DOM-123");
        ticketRecord.setDescription("DOM-123:description");
        ticketRecord.setStoryPoint(3.0);
        ticketRecord.setCreator("jianyang,jason,xianchen,da-long,yangliu");
        ticketRecordService.save(ticketRecord);
    }

//    @Test
//    public void testQueryByDate() {
//        LocalDate date = LocalDate.now();
//        Page<TicketRecord> pokerInfos = ticketRecordService.queryByDate(date, 1, 50);
//        Assert.assertEquals(2, pokerInfos.getTotalElements());
//    }
//
//    @Test
//    public void testQueryByTicketNum() {
//        Page<TicketRecord> pokerInfos = ticketRecordService.queryByTicketNum("doM-123", 1, 50);
//        Assert.assertEquals(3, pokerInfos.getTotalElements());
//    }
//
//    @Test
//    public void testQueryByTicketNumAndDate() {
//        Page<TicketRecord> pokerInfos = ticketRecordService.queryByTicketNumAndDate("doM-123", LocalDate.now(),1,50);
//        Assert.assertEquals(2, pokerInfos.getTotalElements());
//    }

}
