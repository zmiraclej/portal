package cn.com.wtrj.jx.web.portal.controller.response.score;

import java.util.List;
import java.util.Map;

public class StudentScoreRet {
	private List<String> subjects;
	
	private List<String> studentNames;
	
	private Map<String, List<Double>> subjectScores;

	public List<String> getSubjects() {
		return subjects;
	}

	public void setSubjects(List<String> subjects) {
		this.subjects = subjects;
	}

	public List<String> getStudentNames() {
		return studentNames;
	}

	public void setStudentNames(List<String> studentNames) {
		this.studentNames = studentNames;
	}

	public Map<String, List<Double>> getSubjectScores() {
		return subjectScores;
	}

	public void setSubjectScores(Map<String, List<Double>> subjectScores) {
		this.subjectScores = subjectScores;
	}
}
