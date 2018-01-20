package cn.com.wtrj.jx.web.portal.controller.response.score;

import java.util.List;
import java.util.Map;

public class SchoolJunfenRet {
	private List<String> subjects;
	
	private List<String> schoolNames;
	
	private Map<String, List<Double>> subjectJunfen;

	public List<String> getSubjects() {
		return subjects;
	}

	public void setSubjects(List<String> subjects) {
		this.subjects = subjects;
	}

	public List<String> getSchoolNames() {
		return schoolNames;
	}

	public void setSchoolNames(List<String> schoolNames) {
		this.schoolNames = schoolNames;
	}

	public Map<String, List<Double>> getSubjectJunfen() {
		return subjectJunfen;
	}

	public void setSubjectJunfen(Map<String, List<Double>> subjectJunfen) {
		this.subjectJunfen = subjectJunfen;
	}
}
