package com.nhxv.taskmanager.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateHandler extends StdDeserializer<Date> {
    public DateHandler() {
        this(null);
    }

    public DateHandler(Class<?> cls) {
        super(cls);
    }

    @Override
    public Date deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        String date = jsonParser.getText();
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            return formatter.parse(date);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
