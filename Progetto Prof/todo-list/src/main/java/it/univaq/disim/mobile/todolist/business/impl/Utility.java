package it.univaq.disim.mobile.todolist.business.impl;

import java.security.SecureRandom;

public class Utility {

    protected static SecureRandom random = new SecureRandom();

    public static String generateToken() {
        long longToken = Math.abs(random.nextLong());
        return Long.toString(longToken, 200);

    }

}
