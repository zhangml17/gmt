package com.thpower.scada.model;
/**
* @author admin
* @version 创建时间：2017年11月14日 下午3:33:51
* 类说明
*/
public class THPUser {
	
	private long userId;
	private long userRootId;
	private String userEmail;	
	private String userName;
	private String userPassword;	
	private String userAge;
	private String userSex;
	private String userLevel;
	private String userIsValid;
	private String userNote;
	private String userCreateTime;
	private String userModifyTime;
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public long getUserRootId() {
		return userRootId;
	}
	public void setUserRootId(long userRootId) {
		this.userRootId = userRootId;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getUserAge() {
		return userAge;
	}
	public void setUserAge(String userAge) {
		this.userAge = userAge;
	}
	public String getUserSex() {
		return userSex;
	}
	public void setUserSex(String userSex) {
		this.userSex = userSex;
	}
	public String getUserLevel() {
		return userLevel;
	}
	public void setUserLevel(String userLevel) {
		this.userLevel = userLevel;
	}
	public String getUserIsValid() {
		return userIsValid;
	}
	public void setUserIsValid(String userIsValid) {
		this.userIsValid = userIsValid;
	}
	public String getUserNote() {
		return userNote;
	}
	public void setUserNote(String userNote) {
		this.userNote = userNote;
	}
	public String getUserCreateTime() {
		return userCreateTime;
	}
	public void setUserCreateTime(String userCreateTime) {
		this.userCreateTime = userCreateTime;
	}
	public String getUserModifyTime() {
		return userModifyTime;
	}
	public void setUserModifyTime(String userModifyTime) {
		this.userModifyTime = userModifyTime;
	}
	@Override
	public String toString() {
		return "THPUser [userId=" + userId + ", userRootId=" + userRootId + ", userEmail=" + userEmail + ", userName="
				+ userName + ", userPassword=" + userPassword + ", userAge=" + userAge + ", userSex=" + userSex + ", userLevel=" + userLevel+ ", userIsValid=" + userIsValid
				+ ", userNote=" + userNote + ", userCreateTime=" + userCreateTime + ", userModifyTime=" + userModifyTime
				+ "]";
	}
	
	
	

}