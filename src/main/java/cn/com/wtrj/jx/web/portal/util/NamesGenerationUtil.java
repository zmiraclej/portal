package cn.com.wtrj.jx.web.portal.util;

/**
 * ${DESCRIPTION}
 *
 * @author
 * @create 2017-11-04 11:41
 **/
public class NamesGenerationUtil {

  private static final String[] CLASS_NAMES = { "一班", "二班", "三班", "四班", "五班", "六班", "七班", "八班", "九班", "十班", "十一班",
      "十二班" };
  /**
   * 生成显示名称
   *
   * @param stage
   * @param grade
   * @return
   */
  public static String genGradeName(Integer stage, Integer grade) {
    StringBuilder name = new StringBuilder();
    switch (stage) {
      case 1:
        name.append("小学");
        break;
      case 2:
        name.append("初中");
        break;
      case 3:
        name.append("高中");
        break;
      case 4:
        name.append("国高");
      default:
        break;
    }

    switch (grade) {
      case 1:
        name.append("一年级");
        break;
      case 2:
        name.append("二年级");
        break;
      case 3:
        name.append("三年级");
        break;
      case 4:
        name.append("四年级");
        break;
      case 5:
        name.append("五年级");
        break;
      case 6:
        name.append("六年级");
        break;
      default:
        break;
    }
    return name.toString();
  }

  /**
   *
   * @param stage
   * @param grade
   * @param classNo
   * @return
   */
  public static String genClassName(Integer stage, Integer grade, Integer classNo) {
    StringBuilder name = new StringBuilder();
    switch (stage) {
      case 1:
        name.append("小学");
        break;
      case 2:
        name.append("初中");
        break;
      case 3:
        name.append("高中");
        break;
      case 4:
        name.append("国高");
        break;
      default:
        break;
    }

    switch (grade) {
      case 1:
        name.append("一年级");
        break;
      case 2:
        name.append("二年级");
        break;
      case 3:
        name.append("三年级");
        break;
      case 4:
        name.append("四年级");
        break;
      case 5:
        name.append("五年级");
        break;
      case 6:
        name.append("六年级");
        break;
      default:
        break;
    }

    name.append(CLASS_NAMES[classNo - 1]);

    return name.toString();
  }

  /**
   * 返回学部
   * @param stage
   * @return
   */
  public static String genStageName(Integer stage) {
    StringBuilder name = new StringBuilder();
    switch (stage) {
      case 1:
        name.append("小学");
        break;
      case 2:
        name.append("初中");
        break;
      case 3:
        name.append("高中");
        break;
      default:
        break;
    }
    return name.toString();
  }
}

