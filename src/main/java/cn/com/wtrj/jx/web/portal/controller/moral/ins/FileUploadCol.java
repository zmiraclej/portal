package cn.com.wtrj.jx.web.portal.controller.moral.ins;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * 
 * 文件上传
 *
 */

@Controller
@RequestMapping(value = "/insUpload")
public class FileUploadCol {

	private final Logger logger = LoggerFactory.getLogger(FileUploadCol.class);

	@Value("${upload.file.save.moral}")
	private String fileUrl;

	/**
	 * 支持多上传，但是现在前台未选择文件后自动上传，相当每次只上传一个文件
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "fileUpload")
	@ResponseBody
	public String filesUpload(HttpServletRequest request) {
		List<String> rs = new ArrayList<String>();
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		List<MultipartFile> files = multipartRequest.getFiles("files");
		if (files.size() > 0) {
			for (int i = 0; i < files.size(); i++) {
				MultipartFile file = files.get(i);
				String tmp = saveFile(file);
				rs.add(tmp);
			}
			return StringUtils.join(rs, ";");
		}
		return "";
	}

	@RequestMapping(value = "delete")
	@ResponseBody
	public String delete(@RequestParam(value = "name") String name, HttpServletRequest request) {

		StringBuffer filePath = new StringBuffer(fileUrl);
		filePath.append(name);
		File f = new File(filePath.toString());
		// 存在则删除
		if (f.exists()) {
			f.delete();
		}
		return "success";
	}

	private String saveFile(MultipartFile file) {
		if (!file.isEmpty()) {
			try {
				StringBuffer fileName = new StringBuffer();
				String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
				fileName.append(System.nanoTime()).append(RandomStringUtils.randomNumeric(4)).append(suffix);

				StringBuffer filePath = new StringBuffer(fileUrl);
				filePath.append(fileName);
				File path = new File(fileUrl);
				if (!path.exists()) {
					path.mkdirs();
				}
				File f = new File(filePath.toString());
				file.transferTo(f);
				return fileName.toString();
			} catch (Exception e) {
				logger.error("文件上传错误," + e.getMessage());
			}
		}
		return "";
	}

}
