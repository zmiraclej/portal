package cn.com.wtrj.jx.web.portal.controller.response;

public class PreviewScoreRet {
    private String id;

    private String examInsId;

    private String schoolCode;

    private String grade;

    private String classId;

    private String idCard;

    private String name;

    private double sumNumber;

    private double averageNumber;

    private Integer orderNumber;

    private double classTopScore;

    private String examInsName;
    
    private String courseScore;

    private String studentCode;
    
    private Integer gradeOrderNo;
    
    private double classBottomScore;
    
    

	public double getClassBottomScore() {
		return classBottomScore;
	}

	public void setClassBottomScore(double classBottomScore) {
		this.classBottomScore = classBottomScore;
	}

	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentCode() {
		return studentCode;
	}

	public void setStudentCode(String studentCode) {
		this.studentCode = studentCode;
	}

	public String getExamInsId() {
        return examInsId;
    }

    public void setExamInsId(String examInsId) {
        this.examInsId = examInsId;
    }

    public String getSchoolCode() {
        return schoolCode;
    }

    public Integer getGradeOrderNo() {
		return gradeOrderNo;
	}

	public void setGradeOrderNo(Integer gradeOrderNo) {
		this.gradeOrderNo = gradeOrderNo;
	}

	public void setSchoolCode(String schoolCode) {
        this.schoolCode = schoolCode;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSumNumber() {
        return sumNumber;
    }

    public void setSumNumber(double sumNumber) {
        this.sumNumber = sumNumber;
    }

    public double getAverageNumber() {
        return averageNumber;
    }

    public void setAverageNumber(double averageNumber) {
        this.averageNumber = averageNumber;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public double getClassTopScore() {
        return classTopScore;
    }

    public void setClassTopScore(double classTopScore) {
        this.classTopScore = classTopScore;
    }

    public String getExamInsName() {
        return examInsName;
    }

    public void setExamInsName(String examInsName) {
        this.examInsName = examInsName;
    }

	public String getCourseScore() {
		return courseScore;
	}

	public void setCourseScore(String courseScore) {
		this.courseScore = courseScore;
	}
}
