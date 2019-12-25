package org.os890.meecrowave.template;

import java.util.function.IntSupplier;

public class RandomResponse {
    private final IntSupplier supplier;

    public RandomResponse(IntSupplier supplier) {
        this.supplier = supplier;
    }

    public int getValue() {
        return supplier.getAsInt();
    }

}
