package com.example.customerapp;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/** Runs the REST API against an in-memory H2 database, so no MySQL is needed for tests. */
@SpringBootTest
@AutoConfigureMockMvc
class CustomerApiTests {

    @Autowired
    private MockMvc mvc;

    private long createCustomer() throws Exception {
        MvcResult res = mvc.perform(post("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {"customerType":"Individual","fullName":"Test User","dob":"1990-01-01",
                             "status":"Active","contactNumber":"9876543210","email":"test@example.com",
                             "countryOfOrigin":"India","effectiveDate":"2025-02-03"}
                            """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andReturn();
        String body = res.getResponse().getContentAsString();
        return ((Number) com.jayway.jsonpath.JsonPath.read(body, "$.id")).longValue();
    }

    @Test
    void customerCanBeCreatedListedAndDeleted() throws Exception {
        long id = createCustomer();
        mvc.perform(get("/api/customers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.id == " + id + ")].fullName").value("Test User"));
        mvc.perform(delete("/api/customers/" + id)).andExpect(status().isOk());
        mvc.perform(get("/api/customers"))
                .andExpect(jsonPath("$[?(@.id == " + id + ")]").isEmpty());
    }

    @Test
    void kycRecordsLinkToACustomer() throws Exception {
        long id = createCustomer();
        String customerRef = "\"customer\":{\"id\":" + id + "}";

        mvc.perform(post("/api/proofs").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"idType\":\"PAN\",\"idValue\":\"ABCDE1234F\",\"startDate\":\"2025-01-01\"," + customerRef + "}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.customer.id").value(id));
        mvc.perform(post("/api/addresses").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"addressType\":\"Home\",\"city\":\"Manipal\",\"state\":\"Karnataka\",\"zipCode\":\"576104\",\"country\":\"India\"," + customerRef + "}"))
                .andExpect(status().isOk());
        mvc.perform(post("/api/contacts").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"contactType\":\"Mobile\",\"contactValue\":\"9876543210\"," + customerRef + "}"))
                .andExpect(status().isOk());
        mvc.perform(post("/api/names").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nameType\":\"First\",\"nameValue\":\"Test\"," + customerRef + "}"))
                .andExpect(status().isOk());

        for (String path : new String[]{"/api/proofs", "/api/addresses", "/api/contacts", "/api/names"}) {
            mvc.perform(get(path)).andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(1));
        }
    }
}
