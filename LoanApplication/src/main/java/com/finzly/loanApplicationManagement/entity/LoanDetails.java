package com.finzly.loanApplicationManagement.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
@Entity
public class LoanDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int customerId;
	private double loanAmount;
	private LocalDate tradeDate;
	private LocalDate loanStartDate;
	private int termOfLoanInMonths;
	private String paymentTerm;
	private LocalDate  maturityDate;
	private int paymentFrequency;
	private double intrestRate;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "paymentId",referencedColumnName = "customerId")
	public List<PaymentSchedule> paymentSchedules = new ArrayList<>();
//	private PaymentSchedule paymentSchedule;
	
	
	public LoanDetails(int customerId, double loanAmount, LocalDate tradeDate, LocalDate loanStartDate,
				int termOfLoanInMonths, String paymentTerm, LocalDate maturityDate, int paymentFrequency, double intrestRate,
				List<PaymentSchedule> paymentSchedules) {
			super();
			this.customerId = customerId;
			this.loanAmount = loanAmount;
			this.tradeDate = tradeDate;
			this.loanStartDate = loanStartDate;
			this.termOfLoanInMonths = termOfLoanInMonths;
			this.paymentTerm = paymentTerm;
			this.maturityDate = maturityDate;
			this.paymentFrequency = paymentFrequency;
			this.intrestRate = intrestRate;
			this.paymentSchedules = paymentSchedules;
		}

	//	public PaymentSchedule getPaymentSchedule() {
//		return paymentSchedule;
//	}
//
//	public void setPaymentSchedule(PaymentSchedule paymentSchedule) {
//		this.paymentSchedule = paymentSchedule;
//	}
	public String getPaymentTerm() {
		return paymentTerm;
	}

	public void setPaymentTerm(String paymentTerm) {
		this.paymentTerm = paymentTerm;
	}


	public List<PaymentSchedule> getPaymentSchedules() {
		return paymentSchedules;
	}

	public void setPaymentSchedules(List<PaymentSchedule> paymentSchedules) {
		this.paymentSchedules = paymentSchedules;
	}

	public int getTermOfLoanInMonths() {
		return termOfLoanInMonths;
	}

	public void setTermOfLoanInMonths(int termOfLoanInMonths) {
		this.termOfLoanInMonths = termOfLoanInMonths;
	}

	public LoanDetails() {
	}


	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public double getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(double loanAmount) {
		this.loanAmount = loanAmount;
	}

	public LocalDate getTradeDate() {
		return tradeDate;
	}

	public void setTradeDate(LocalDate tradeDate) {
		this.tradeDate = tradeDate;
	}

	public LocalDate getLoanStartDate() {
		return loanStartDate;
	}

	public void setLoanStartDate(LocalDate loanStartDate) {
		this.loanStartDate = loanStartDate;
	}

	public LocalDate getMaturityDate() {
		return maturityDate;
	}

	public void setMaturityDate(LocalDate maturityDate) {
		this.maturityDate = maturityDate;
	}

	public int getPaymentFrequency() {
		return paymentFrequency;
	}

	public void setPaymentFrequency(int paymentFrequency) {
		this.paymentFrequency = paymentFrequency;
	}



	public double getIntrestRate() {
		return intrestRate;
	}



	public void setIntrestRate(double intrestRate) {
		this.intrestRate = intrestRate;
	}

	@Override
	public String toString() {
		return "LoanDetails [customerId=" + customerId + ", loanAmount=" + loanAmount + ", tradeDate=" + tradeDate
				+ ", loanStartDate=" + loanStartDate + ", termOfLoanInMonths=" + termOfLoanInMonths + ", paymentTerm="
				+ paymentTerm + ", maturityDate=" + maturityDate + ", paymentFrequency=" + paymentFrequency
				+ ", intrestRate=" + intrestRate + ", paymentSchedules=" + paymentSchedules + "]";
	}
	
	
	
	
	
}