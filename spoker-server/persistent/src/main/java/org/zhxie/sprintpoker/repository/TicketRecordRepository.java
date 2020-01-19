package org.zhxie.sprintpoker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.zhxie.sprintpoker.entity.TicketRecord;

public interface TicketRecordRepository extends JpaRepository<TicketRecord, Integer> , JpaSpecificationExecutor<TicketRecord> {
    TicketRecord findById(String id);
}
