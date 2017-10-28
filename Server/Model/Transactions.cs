using System;
using System.ComponentModel.DataAnnotations;

public class Transaction {
    [Key]
    public int TransactionId { get; set; }
    public string Creditor { get; set; }
    public string Debtor { get; set; }
    public decimal Gross { get; set; }
    public string Reference { get; set; }
    public DateTime Date { get; set; }
    public string EnteredBy { get; set; }
    public TimestampAttribute EnteredDate { get; set; }
}
