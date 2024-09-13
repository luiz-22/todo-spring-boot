package com.example.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private Long id;

    @NotBlank
    private String note;

    private boolean done;

    private Long userId;
}
