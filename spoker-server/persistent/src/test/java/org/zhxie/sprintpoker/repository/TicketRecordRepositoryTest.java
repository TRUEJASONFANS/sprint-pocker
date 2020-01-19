package org.zhxie.sprintpoker.repository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.zhxie.sprintpoker.JpaConfiguration;
import org.zhxie.sprintpoker.entity.TicketRecord;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {JpaConfiguration.class})
public class TicketRecordRepositoryTest {
    @Autowired
    private TicketRecordRepository ticketRecordRepository;

    @Before
    public void setUp() throws Exception {
        ticketRecordRepository.deleteAll();
        TicketRecord ticketRecord = new TicketRecord();
        ticketRecord.setFeature("101");
        ticketRecord.setCreator("zhxie");
        ticketRecord.setStoryPoint(1.2);

        TicketRecord ticketRecord2 = new TicketRecord();
        ticketRecord2.setFeature("102");
        ticketRecord2.setCreator("zhxie");
        ticketRecord2.setStoryPoint(1.2);

        TicketRecord ticketRecord3 = new TicketRecord();
        ticketRecord3.setFeature("103");
        ticketRecord3.setCreator("zhxie");
        ticketRecord3.setStoryPoint(1.2);

        ticketRecordRepository.save(ticketRecord);
        ticketRecordRepository.save(ticketRecord2);
        ticketRecordRepository.save(ticketRecord3);
    }

    @Test
    public void testFindAll(){
        int pageOffSet = 2;
        int pageLimit = 2;
        Sort sort = new Sort(Sort.Direction.ASC, "id");
        Pageable pageable = PageRequest.of(pageOffSet -1, pageLimit,sort);
        final Page<TicketRecord> all = ticketRecordRepository.findAll(pageable);
        assertTrue(all.getContent().get(0).getFeature().equalsIgnoreCase("103"));
        assertEquals(all.getContent().get(0).getCreator(), "zhxie");
    }

}