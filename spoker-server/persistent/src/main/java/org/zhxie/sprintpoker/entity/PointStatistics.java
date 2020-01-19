package org.zhxie.sprintpoker.entity;

public class PointStatistics {

	private int fibonacciNum;

	private Long count;

	public PointStatistics(int fibonacciNum, Long count) {
		super();
		this.fibonacciNum = fibonacciNum;
		this.count = count;
	}

	public int getFibonacciNum() {
		return fibonacciNum;
	}

	public void setFibonacciNum(int fibonacciNum) {
		this.fibonacciNum = fibonacciNum;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}


}
