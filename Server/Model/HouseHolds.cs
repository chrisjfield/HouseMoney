using System.ComponentModel.DataAnnotations;

public class HouseHold {
    [Key]
    public string HouseHoldId { get; set; }
    public string Name { get; set; }
}
