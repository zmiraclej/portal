package cn.com.wtrj.jx.web.portal.controller.response.score;

import java.util.List;
import java.util.Map;

public class ClassJunfenRet {
	private List<String> subjects;
	
	private List<String> classNames;
	
	private Map<String, List<Double>> subjectJunfen;

	public List<String> getSubjects() {
		return subjects;
	}

	public void setSubjects(List<String> subjects) {
		this.subjects = subjects;
	}

	public Map<String, List<Double>> getSubjectJunfen() {
		return subjectJunfen;
	}

	public void setSubjectJunfen(Map<String, List<Double>> subjectJunfen) {
		this.subjectJunfen = subjectJunfen;
	}

	public List<String> getClassNames() {
		return classNames;
	}

	public void setClassNames(List<String> classNames) {
		this.classNames = classNames;
	}
}
