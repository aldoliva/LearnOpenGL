#version 330 core
out vec4 FragColor;

in vec3 ourColor;
in vec4 ourPosition;

void main()
{
    FragColor = vec4(ourPosition);
}

// Why is the bottom-left side of our triangle black?
// Answer: Because that position is negative on x and y, and z is always 0, so the RGB would be -0.5, -0.5, 0.0