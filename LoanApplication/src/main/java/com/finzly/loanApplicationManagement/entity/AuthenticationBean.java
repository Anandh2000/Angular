package com.finzly.loanApplicationManagement.entity;

public class AuthenticationBean {
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public AuthenticationBean(String message) {
		
		this.message = message;
	}

	public AuthenticationBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "AuthenticationBean [message=" + message + "]";
	}
	
	
}
