using System.ComponentModel.DataAnnotations;

public class User {
    [Key]
    public string UserId { get; set; }
    public string DisplayName { get; set; }
    public int HouseHoldId { get; set; }
}
