package org.mathbiol.TCGA.json;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.*;
import java.io.*;

/**
 * Servlet implementation class Module
 */
@WebServlet("/Module")
public class Module extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Module() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
			    response.setContentType("text/html");
			    PrintWriter out = response.getWriter();
			    
			    URL usr_json = new URL("https://dl.dropbox.com/s/4g59n5kitjlxctb/agrueneberg.json");
		        BufferedReader in = new BufferedReader(
		        new InputStreamReader(usr_json.openStream()));
                  
		       
		        String allText="";
		        String inputLine;
		        while ((inputLine = in.readLine()) != null){
		        	  allText=allText+inputLine;
		        }
		            
		        in.close();
		        
		        
		        out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 " +
                        "Transitional//EN\">\n" +
"<HTML>\n" +
"<HEAD><TITLE>Hello WWW</TITLE></HEAD>\n" +
"<BODY>\n" +
allText+
"\n" +
"</BODY></HTML>");
			    
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
		
	}

}
