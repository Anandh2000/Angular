package com.finzly.loanApplicationManagement.serviceImplementation;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.finzly.loanApplicationManagement.Service.LoanService;
import com.finzly.loanApplicationManagement.entity.LoanDetails;
import com.finzly.loanApplicationManagement.entity.PaymentSchedule;
import com.finzly.loanApplicationManagement.errorHandler.ErrorHandlerService;
import com.finzly.loanApplicationManagement.repository.LoanDetailsRepository;

@Component
public class LoanServiceImpl implements LoanService{
	@Autowired
	private ErrorHandlerService errorHandlerService;
	
	@Autowired
	private LoanDetailsRepository repository;


	@Override
	public ResponseEntity<?> applyLoan(LoanDetails details) {
		
		List<PaymentSchedule> schedules = details.getPaymentSchedules();
		int paymentSchedule = details.getTermOfLoanInYears()/details.getPaymentFrequency();
		System.out.println(paymentSchedule);
		double tempLoanAmount = details.getLoanAmount();
		LocalDate dat = details.getLoanStartDate();
		for(int i = 0;i<paymentSchedule;i++) {
			PaymentSchedule schedule=new  PaymentSchedule();
			System.out.println("hoo");
			dat =dat.plusMonths(details.getPaymentFrequency());
			schedule.setPaymentDate(dat);
			schedule.setPrincipal(details.getLoanAmount()/paymentSchedule);
			schedule.setProjectedInterest(tempLoanAmount/details.getIntrestRate());
			tempLoanAmount = tempLoanAmount-schedule.getPrincipal();
			if(schedule.getPaymentDate().equals(LocalDate.now())) {
				schedule.setPaymentStatus("AWAITINGPAYMENT");
			}
			else if(schedule.getPaymentDate().compareTo(LocalDate.now())<0){
				schedule.setPaymentStatus("PAID");
			}
			else {
				schedule.setPaymentStatus("PROJECTED");
			}
			schedule.setPaymentAmount(schedule.getProjectedInterest()+schedule.getPrincipal());
			schedules.add(schedule);
			
		}
		details.setPaymentSchedules(schedules);
		System.out.println(schedules.toString());
		repository.save(details);
		return new ResponseEntity<>("creaiuyut7",HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<?> getAllDetails() {
		return new ResponseEntity(repository.findAll(),HttpStatus.OK);
	
	}

	@Override
	public ResponseEntity<?> getLoansByCustomerId(long id) {
		
		return null;
	}

	@Override
	public ResponseEntity<?> payementScheduler() {
		return null;
	}

	@Override
	public ResponseEntity<?> setInterest(double rate) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
